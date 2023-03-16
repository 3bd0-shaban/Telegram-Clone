import { createContext, useEffect, useRef, useState } from 'react';
import getSocket from '../Utils/SocketConnect';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Redux/Slices/UserSlice';

const PeerContext = createContext({});

export const PeerProvider = ({ children }) => {
    const socket = getSocket();
    const userInfo = useSelector(selectCurrentUser)
    const [callAccepted, setCallAccepted] = useState(false);
    const [isVideoCalling, setIsVideoCalling] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [isMyCam, setIsMyCam] = useState(true);
    const [stream, setStream] = useState();
    const [acceptorName, setAcceptorName] = useState('');
    const [callingInfo, setCallingInfo] = useState({});
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.on('callUser', ({ from, to, callerName, acceptorName, signal }) => {
            setIsVideoCalling(true)
            setCallingInfo({ from, to, callerName, acceptorName, signal });
            console.log('calling......')
        });

        if (isVideoCalling) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    setStream(currentStream);
                    if (myVideo.current) {
                        myVideo.current.srcObject = currentStream;
                    }
                    // myVideo.current.srcObject = currentStream;
                })
                .catch((error) => {
                    console.error('Error getting media stream:', error);
                    setIsVideoCalling(false);
                });

        }

    }, [socket, isVideoCalling]);
    const callUser = ({ id, acceptorName }) => {

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { receiver: id, signalData: data, sender: userInfo?._id, callerName: `${userInfo?.firstname} ${userInfo?.lastname}`, acceptorName });
            setAcceptorName(acceptorName)
            setIsVideoCalling(true)
        });

        peer.on('stream', (currentStream) => {
            console.log(currentStream)
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, from: callingInfo.from, to: callingInfo.to });
        });

        peer.on('stream', (currentStream) => {
            console.log('onaswer', userVideo.current)
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(callingInfo.signal);

        connectionRef.current = peer;
    };


    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };


    return <PeerContext.Provider value={{
        callingInfo,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        acceptorName,
        callUser,
        setCallingInfo,
        callEnded,
        leaveCall,
        answerCall,
        isVideoCalling,
        setIsVideoCalling,
        setIsMyCam,
        isMyCam,
    }}>{children}
    </PeerContext.Provider>;
};

export default PeerContext;
