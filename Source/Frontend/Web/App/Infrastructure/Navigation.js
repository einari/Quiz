class Navigation
{
    goTo(viewName) {
        document.location.hash = viewName;
    }
}
export default new Navigation();