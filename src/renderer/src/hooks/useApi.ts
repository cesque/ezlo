import type { Api } from '../../../types/Api'

export default function useApi() {
    return window.api as Api
}