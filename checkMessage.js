const checkMessage = (message) => {
    try {
        if (message.indexOf(":") < 0 || message.indexOf(" ") > 0) {
            throw new Error("The format is incorrect.");
        }
        const [marketName, stockName] = message.split(":")

        if(marketName.length < 0 || stockName.length < 0) {
            throw new Error("You must enter a name.")
        }

        return true

    } catch (e) {
        console.log(e.message)
        return false
    }
}

export default checkMessage;