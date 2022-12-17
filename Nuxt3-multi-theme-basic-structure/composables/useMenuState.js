

function menuMethods(functionName='', ...args) {
    const methods = {
        toggleSidebar(){
            let menuState = useMenuState('menu').value
            menuState.isCollapse = !menuState.isCollapse
        },
        isCollapse(){
            return useMenuState('menu').value.isCollapse
        },
        activeMenu(menu, subMenu='') {
            let menuState = useMenuState('menu').value
            if(menuState.menu == menu){
                menuState.isCollapseMenu = !menuState.isCollapseMenu
            }else{
                menuState.isCollapseMenu = true
            }
            menuState.menu = menu;
            menuState.subMenu = subMenu;
        },
        activeSubMenu(menu, subMenu='') {
            let menuState = useMenuState('menu').value
            menuState.menu = menu;
            menuState.subMenu = subMenu;
        },
        isCurrent(menu, subMenu = "",) {
            let menuState = useMenuState('menu').value
            if (menu && !subMenu) {
                if (menuState.menu == menu && menuState.isCollapseMenu) {
                    return true
                } else {
                    return false
                }
            } else if (menu && subMenu) {
                if (menuState.menu == menu && menuState.subMenu == subMenu && menuState.isCollapseMenu) {
                    return true
                }
            } else {
                return "";
            }
        },
        toggleProfilePopup(){
            let menuState = useMenuState('menu').value
            menuState.showProfilePopup = !menuState.showProfilePopup
        },
        toggleRighttSideNavbar(){
            let menuState = useMenuState('menu').value
            menuState.showRighttSideNavbar = !menuState.showRighttSideNavbar
        },
        onloadSelectMenu(){
            let menuState = useMenuState().value
            let menu = useRoute().path.split('/').splice(1)[0]
            menuState.menu = menu
            let menuGroups = ['users']
            if(menuGroups.includes(menu)) menuState.isCollapseMenu = true
        }
    };


    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if (functionName && methods.hasOwnProperty(functionName)) {
        return methods[functionName](...args)
    } else {
        return methods
    }
}

export { menuMethods }; // We can call this function globally

export default function () {
    return useState('menu', () => ({
        isCollapse: false,
        isCollapseMenu: false,
        menu: 'dashboard',
        subMenu: '',
        showProfilePopup:false,
        isLoading: false,
        showRighttSideNavbar:false
    }))
}

