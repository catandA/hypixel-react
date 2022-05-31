import { toast } from "react-toastify";

export default function registerNotificationCallback(router) {
    let interval = setInterval(function () {
        // wait until messaging is definded
        let messaging = (window as any).messaging;
        if (typeof messaging == 'undefined') return;
        clearInterval(interval);

        messaging.onMessage(function (payload) {
            let notification = payload.notification;
            displayNotification(notification);
        });
    }, 10);

    function displayNotification(notification: any) {
        toast.info(notification.title + "\n" + notification.body, {
            onClick: () => {
                router.push(
                    '/' + notification.click_action.match(/\/\/[^/]+\/([^.]+)/)[1]
                );
            },
            autoClose: 20000
        });
    }
}