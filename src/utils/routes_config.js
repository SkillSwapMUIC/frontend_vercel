const backendURL =  'http://127.0.0.1:5555';

const defined_routes = {

    get_thread_by_id : "/qanda/thread/byid/",
    submit_question : "/qanda/question/submit",
    get_random_six_titles: "/qanda/getrandomsixtitles"
}






const routes  = (route) => {
    return backendURL + defined_routes[route];
}

export default routes;