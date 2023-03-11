import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Emoji = ({ setContent, content }) => {
    return (
        <>
            <Picker
                data={data}
                previewPosition='none'
                theme='light'
                showSkinTones="true"
                showPreview="false"
                onEmojiSelect={(e) => setContent(content + e.native)}
            />
        </>
    );
};

export default Emoji;
