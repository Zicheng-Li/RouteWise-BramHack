export function analyzePortfolioPrompt(user : any) {
    let prePrompt = "below is a json object of a user. it contains firstname, lastname, routes, cars, friends, totalemission, totalexpenditure, total time spent. every route is an object of itself which has the frequence (an array representing on what days the route is being taken, for example, 1 in 0th index says the route is being taken on monday) and what car is being used. The cars are also a separate model and they have the year, make, efficiency and other information : "

    let postPrompt = "based on the provided information. Give us a response which analyzes this portfolio and give actions that should be taken to decrease carbon emission. give a very structured and to the point response eliminating every line that is not necessary. the response should only contain what has been asked. try to have specific reports. Make sure the suggestions are realistic and are easy to implement. The response type should be concise and should not use unnecessary lengthy lines. It should always have a crisp summary of the user's trends. do not write any of the input again. I just want the analysis in the response and nothing else. your answer should be a plain string with alphabet and numbers only, do not use * or anything like that."

    return prePrompt + JSON.stringify(user) + postPrompt;
}

export function suggestCollaborations(user: any, others: any) {
    const prePrompt = "You will receive a JSON object representing a route that our user takes, including details such as: - The cars they use- The total travel distance- The time taken- Emission data- Start and end points Your task is to analyze potential carpool opportunities by reviewing the routes of other users in the database. Youll receive an array of other users with similar route data after this:"

    const postPrompt = "Carefully compare the routes of each user in the database with our users route, noting:- If any routes overlap, intersect, or align in a way that realistically supports carpooling - Assess only genuine, practical carpooling matches (considering distance, timing, and start/end points), if no collaboration is possible, skip it and say nothing about it. For the ones in which it is possible, Provide your findings in clear, concise points. For each potential collaboration, include:- The persons full name and email (e.g., John Doe <john.doe@example.com>) - A brief description of their route and how it aligns with the user's route. in the end If 0 realistic carpooling options are found, respond with “No collaborations possible.” your responses should be to the point with a properly structured response style. I strictly do not want any text that is not necessary to be there (text like summary and words that are present to elongate the sentences) your answer should be a plain string with alphabet and numbers only, do not use * or anything like that."
    ;

    return prePrompt + JSON.stringify(user) + postPrompt + JSON.stringify(others);
}
