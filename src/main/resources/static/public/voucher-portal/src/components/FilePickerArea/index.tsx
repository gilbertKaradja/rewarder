import React, { Component, SyntheticEvent, RefObject } from 'react';
import UploadIcon from '../../assets/icons/upload.svg';




interface Props {
    fileType: string;
    buttonText: string;
    onFileSelect: any;
}

interface State {
    areaActive: boolean;
    file: File | null;
}

class FilePickerArea extends Component<Props, State> {

    count: number = 0;
    fileInputRef: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: Props) {
        super(props);

        this.state = {
            areaActive: false,
            file: null
        }
    }


    render() {
        const { fileType, buttonText } = this.props;
        const { areaActive, file } = this.state;

        const fileName = file != null ? file.name : null;

        return (
            <div className={`file-picker-area ${areaActive ? 'active' : ''}`}
                onDragEnter={this.onDragEnterHandler}
                onDragOver={this.onDragOverHandler}
                onDragLeave={this.onDragLeaveHandler}
                onDrop={this.onDropHandler}
            >

                <img src={UploadIcon} alt="Upload Icon" />

                <div className="title">
                    Drag and Drop your <span>{fileType}</span> file here
                </div>

                <div className="delim-text">or</div>

                {file === null && (
                    <button
                        className="pick-button"
                        onClick={this.pickFileButtonHandler}>
                        {buttonText}
                    </button>
                )}

                {file != null && (
                    <div className="selected-file-container">
                        <div>
                            <span>{fileName}</span>
                        </div>
                        <button onClick={this.pickFileButtonHandler}>Change</button>
                    </div>
                )}

                <input
                    type="file"
                    ref={this.fileInputRef}
                    onChange={this.fileInputOnChange}
                />
            </div>
        )
    }

    onDragEnterHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        this.count += 1;

        if (this.count === 1) {
            this.setState({ areaActive: true });
        }
    }

    onDragOverHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    onDragLeaveHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        this.count -= 1;

        if (this.count === 0) {
            this.setState({ areaActive: false });
        }
    }

    onDropHandler = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const { onFileSelect } = this.props;

        let file: File | null = null;

        const dataTransfer = event.dataTransfer;
        const files = dataTransfer.files;

        if (files.length > 0) {
            file = files[0];
            onFileSelect(file);
        }

        this.count = 0;

        this.setState({ areaActive: false, file: file });
    }

    pickFileButtonHandler = (event: SyntheticEvent) => {
        if (this.fileInputRef.current != null) {
            this.fileInputRef.current.click();
        }
    }

    fileInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onFileSelect } = this.props;

        const files = event.target.files;

        if (files === null || files.length < 1) {
            return;
        }

        let file: File | null = null;

        if (files.length > 0) {
            file = files[0];
            onFileSelect(file);
        }

        this.setState({ file: file });


    }


}

export default FilePickerArea;