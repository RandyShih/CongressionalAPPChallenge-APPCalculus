export default {
    async fetch(request, env) {
        const {pathname} = new URL(request.url);
        console.log(pathname);
    }
} 




function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
    alert(env.testing);
}

function pageRedirect(page) {
    window.location.href = page
}