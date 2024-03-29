const backendURL =  'https://backend-vercel-two.vercel.app';

const defined_routes = {

    get_thread_by_id : "/qanda/thread/byid/",
    submit_question : "/qanda/question/submit",
    get_random_six_titles: "/qanda/getrandomsixtitles"
}






const routes  = (route) => {
    return backendURL + defined_routes[route];
}

export default routes;