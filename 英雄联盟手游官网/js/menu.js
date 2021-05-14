(function () {
    const divSwitch = $(".menu-switch");
    const ulNav = $(".menu-nav")

    // 切换菜单的显示状态
    function toggleNav() {
        // classList
        divSwitch.classList.toggle("menu-switch--expand");
        ulNav.classList.toggle("menu-nav--expend");
    }

    
    divSwitch.onclick = toggleNav;
    ulNav.onclick = toggleNav;
})();