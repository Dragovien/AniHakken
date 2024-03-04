import { LocalStorage } from "quasar";

class AuthHeader {
  constructor({ targetedProjectId = null, targetedBusinessId = null } = {}) {
    this.context = {
      targetedProjectId: targetedProjectId,
      targetedBusinessId: targetedBusinessId
    }
  }

  getToken() {
    return LocalStorage.getItem('token')
  }

  // getHeader() {
  //   const token = this.getToken()
  //   if (token) {
  //     const globalStore = useGlobalStore();
  //     return {
  //       'Content-Type': 'application/json',
  //       'x-access-token': token,
  //       'x-context': JSON.stringify(this.context),
  //       'x-locale': globalStore.lang,
  //       'x-current-project-id': globalStore.currentProject?.id,
  //     }
  //   }
  //   // case of external user
  //   if (LocalStorage.getItem('collectToken')) {
  //     const globalStore = useGlobalStore();
  //     return {
  //       'Content-Type': 'application/json',
  //       'x-external-token': LocalStorage.getItem('collectToken'),
  //       'x-context': JSON.stringify(this.context),
  //       'x-current-project-id': globalStore.currentProject?.id,
  //     }
  //   }
  //   return {}
  // }

  getTokenOnlyHeader() {
    const token = this.getToken()
    if (token) {
      return {
        'x-access-token': token,
      }
    }
  }
}

export default AuthHeader
