import { notification } from "ant-design-vue"
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons-vue"
import useApp from "@composable/useApp"

export default function useNotification() {
    const [api, contextHolder] = notification.useNotification()
    const { isLightMode } = useApp()

    const getClassForMode = computed(() => {
        return isLightMode.value ? "light-mode" : "dark-mode"
    })

    function openNotificationError(message: string, description = "") {
        api.info({
            message,
            description,
            placement: "topRight",
            class: getClassForMode.value,
            icon: () => h(CloseCircleFilled, { style: 'color: red' })
        })
    }

    function openNotificationSuccess(message: string, description = "") {
        api.info({
            message,
            description,
            placement: "topRight",
            class: getClassForMode.value,
            icon: () => h(CheckCircleFilled, { style: 'color: green' })
        })
    }

    return {
        contextHolder,
        openNotificationError,
        openNotificationSuccess
    }
}