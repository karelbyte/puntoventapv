export function addDrawer({ commit }, drawer) {
    commit('addDrawer', drawer)
}

export function removeDrawer({ commit }, index) {
    commit('removeDrawer', index)
}