import { useContext } from "react";
import PeerContext from "../Utils/PeerContext";

const usePeer = () => {
    const {
        callingInfo,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        acceptorName,
        callUser,
        setAcceptorName,
        callEnded,
        leaveCall,
        answerCall,
        isVideoCalling,
        isMyCam,
        setIsVideoCalling,
        setIsMyCam,
    } = useContext(PeerContext);

    return {
        callingInfo,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        acceptorName,
        callUser,
        setAcceptorName,
        callEnded,
        leaveCall,
        answerCall,
        isVideoCalling,
        isMyCam,
        setIsVideoCalling,
        setIsMyCam,
    };
};
export default usePeer