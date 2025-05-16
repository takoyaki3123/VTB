import React from "react";
import MDEditor from "@uiw/react-md-editor";
import PropTypes from "prop-types";

const Editor = (props: { show: boolean; value: string; setValue?: ((value?: string) => void) | undefined;  dark?: boolean | undefined;}) => {
    return (
        <div  data-color-mode={props.dark ? 'dark' : 'light'}>
            {
                props.show ?
                    <MDEditor value={props.value} onChange={props.setValue} />
                    :
                    <MDEditor.Markdown source={props.value} style={{ whiteSpace: 'pre-wrap' }}/>
            }
        </div>
    );
}
Editor.propTypes = {
    // string
    value: PropTypes.string.isRequired,
    // bool
    show: PropTypes.bool.isRequired,
    dark: PropTypes.bool,
    // function
    setValue: PropTypes.func,
}
export default Editor;