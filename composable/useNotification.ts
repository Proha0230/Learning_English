import { notification } from "ant-design-vue"
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons-vue"

export default function useNotification() {
    const [api, contextHolder] = notification.useNotification()

    function openNotificationError(message: string, description = "") {
        api.info({
            message,
            description,
            placement: "topRight",
            icon: () => h(CloseCircleFilled, { style: 'color: red' })
        })
    }

    function openNotificationSuccess(message: string, description = "") {
        api.info({
            message,
            description,
            placement: "topRight",
            icon: () => h(CheckCircleFilled, { style: 'color: green' })
        })
    }

    return {
        contextHolder,
        openNotificationError,
        openNotificationSuccess
    }
}