import React, { Component } from 'react';

export const notificationTypes = {
    ERROR: 'error',
    SUCCESS: 'success'
}

class NotificationBox extends Component {

    render() {

        let { show, message, notificationType } = this.props;

        if (!show) {
            return null;
        }

        let classString = "content show " + notificationType;

        return (
            <div className="notification-box">
                <div className={classString}>
                    <div onClick={this.props.onClickHandler}>{message}</div>
                </div>
            </div>
        );
    }
}

export default NotificationBox;
