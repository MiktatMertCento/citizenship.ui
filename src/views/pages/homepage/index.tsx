const HomePage = () => {
    /*const {sendMessage, lastMessage, readyState} = useWebSocket("wss://streaming.forexpros.com/echo/387/ghx02bld/websocket");

    useEffect(() => {
        if (readyState === ReadyState.OPEN && lastMessage?.data === "o") {
            sendMessage(`["{\\"_event\\":\\"bulk-subscribe\\",\\"tzID\\":63,\\"message\\":\\"domain-10:\\"}"]`);
            sendMessage(`["{\\"_event\\":\\"UID\\",\\"UID\\":219278915}"]`);
            sendMessage(`["{\\"_event\\":\\"bulk-subscribe\\",\\"tzID\\":63,\\"message\\":\\"pid-eu-18:%%pid-eu-1183683:%%pidExt-eu-18:%%pidExt-eu-1183683:\\"}"]`);
            sendMessage(`["{\\"_event\\":\\"heartbeat\\",\\"data\\":\\"h\\"}"]`);
        }
    }, [lastMessage, sendMessage, readyState]);

    //5 saniyede bi heartbeat atıyoruz
    useEffect(() => {
        const interval = setInterval(() => {
            sendMessage(`["{\\"_event\\":\\"heartbeat\\",\\"data\\":\\"h\\"}"]`);
        }, 5000);
        return () => clearInterval(interval);
    }, [sendMessage]);*/

    return (
        <>
        </>
    );
}

export default HomePage;
