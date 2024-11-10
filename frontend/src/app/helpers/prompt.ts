export function analyzePortfolioPrompt(user : any) {
    let prePrompt = "below is a json object of a user. it contains firstname, lastname, routes, cars, friends, totalemission, totalexpenditure, total time spent. every route is an object of itself which has the frequence (an array representing on what days the route is being taken, for example, 1 in 0th index says the route is being taken on monday) and what car is being used. The cars are also a separate model and they have the year, make, efficiency and other information : "

    let postPrompt = "based on the provided information. Give us a response which analyzes this portfolio and give actions that should be taken to decrease carbon emission. give a very structured and to the point response eliminating every line that is not necessary. the response should only contain what has been asked. try to have specific reports. Make sure the suggestions are realistic and are easy to implement."

    return prePrompt + JSON.stringify(user) + postPrompt;
}
