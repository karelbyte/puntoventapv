export function addDrawer(state, drawer) {
    state.drawers.push(drawer)
}

export function removeDrawers(state) {
    state.drawers = []
}

export function closeDrawer(state) {
    state.drawers.pop()
}

export function removeDrawer(state, index) {
   state.drawers = state.drawers.filter((item, itemIndex) => itemIndex !== index)
}