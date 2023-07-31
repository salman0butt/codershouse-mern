import { useEffect, useState, useRef, useCallback } from 'react';
import { ACTIONS } from '../actions';
import { useStateWithCallback } from './useStateWithCallback';
import socketInit from '../socket';
import freeice from 'freeice';

export const useWebRTC = (roomId: any, user: any) => {
    const [clients, setClients] = useStateWithCallback([]);
    const audioElements = useRef<any>({});
    const connections = useRef<any>({});
    const socket = useRef<any>(null);
    const localMediaStream = useRef<any>(null);
    const clientsRef = useRef<any>(null);

    useEffect(() => {
        socket.current = socketInit();
    }, [socketInit])

    const addNewClient = useCallback(
        (newClient: any, cb: any) => {
            const lookingFor = clients.find(
                (client: any) => client.id === newClient.id
            );

            if (lookingFor === undefined) {
                setClients(
                    (existingClients: any) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );


    useEffect(() => {
        clientsRef.current = clients;
    }, [clients]);

    useEffect(() => {
        socket.current.on(ACTIONS.MUTE, ({peerId, userId}:any) => {
            setMute(true, userId);
        })

        socket.current.on(ACTIONS.UNMUTE, ({peerId, userId}:any) => {
            setMute(false, userId);
        })

        const setMute = (mute: any, userId: any) => {
          const clientIdx = clientsRef.current.map((client: any) => client.id).indexOf(userId);  
            
          const connectedClients = JSON.parse(
            JSON.stringify(clientsRef.current)
          );

          if(clientIdx > -1) {
            connectedClients[clientIdx].muted = mute;
            setClients(connectedClients);
          }
        }
    }, []);

    const provideRef = (instance: any, userId: any) => {
        if (audioElements.current) {
            audioElements.current[userId] = instance;
        }
    };

    // Capture media
    useEffect(() => {
        const stateCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
        }

        stateCapture().then(() => {
            addNewClient({...user, muted: true}, () => {
                const localElement = audioElements.current[user.id]
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                // socket emit JOIN socket io
                socket.current.emit(ACTIONS.JOIN, { roomId, user });
            });
        });

        return () => {
            // Leaving the room
            localMediaStream.current.getTracks()
                .forEach((track: any) => track.stop());

            socket.current.emit(ACTIONS.LEAVE, { roomId });

        }
    }, []);


    useEffect(() => {
        const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }: any) => {
            // if already connected then give warning
            if (peerId in connections.current) {
                return console.warn(`You are already connteced with ${peerId} (${remoteUser.name})`);
            }
            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            });

            // Handle new ice candidate
            connections.current[peerId].onicecandidate = (event: any) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                });
            }

            // Handle on track on this connection
            connections.current[peerId].ontrack = ({ streams: [remoteStream] }: any) => {
                addNewClient({...remoteUser, muted: true}, () => {
                    if (audioElements.current[remoteUser.id]) {
                        audioElements.current[remoteUser.id].srcObject = remoteStream;
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser.id]) {
                                audioElements.current[remoteUser.id].srcObject = remoteStream;
                                settled = true
                            }
                            if (settled) {
                                clearInterval(interval);
                            }
                        }, 1000);
                    }
                });
            }

            // Add local track to remote connections
            localMediaStream.current.getTracks().forEach((track: any) => {
                connections.current[peerId].addTrack(track, localMediaStream.current);
            });

            // Create offer
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();
                await connections.current[peerId].setLocalDescription(offer);
                
                // send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP, { peerId, sessionDescription: offer });
            }
        };
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        };
    }, []);


    // Handle ice candidate - offer
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }: any) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        };
    }, []);

    // Handle SDP - Answer
    useEffect(() => {
        const handleRemoteSdp = async ({ peerId, sessionDescription: remoteSessionDescription }: any) => {
            if (remoteSessionDescription) {
                connections.current[peerId].setRemoteDescription(
                    new RTCSessionDescription(remoteSessionDescription)
                );
            }
            // if session description is type of offer then create an answer
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer
                });
            }
        }
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        };
    }, []);

    // Handle remove peer
    useEffect(() => {
        const handleRemovePeer = async ({ peerId, userId }: any) => {
            if (connections.current[peerId]) {
                connections.current[peerId].close();
            }
            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients((list: any) => list.filter((client: any) => client.id !== userId));
        };
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER);
        };
    }, []);

    
    const handleMute = (isMute: any, userId: any) => {
        let settled = false;

        if (userId === user.id) {
            let interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks()[0].enabled = !isMute;
                    if (isMute) {
                        socket.current.emit(ACTIONS.MUTE, {
                            roomId,
                            userId: user.id,
                        });
                    } else {
                        socket.current.emit(ACTIONS.UNMUTE, {
                            roomId,
                            userId: user.id,
                        });
                    }
                    settled = true;
                }
                if (settled) {
                    clearInterval(interval);
                }
            }, 200);
        }
    };


    return { clients, provideRef, handleMute };
};