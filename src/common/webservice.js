export const webService = async (url, option) => {
    let response = await fetch(url, option);

    if (response.status >= 200 && response.status <= 204) {
        let data = "";
        try {
            data = await response.json();
        } catch (error) {

        }
        let token = response.headers.get("authorization");

        return {
            result: true,
            token: token,
            content: data,
        };

    } else {
        let data = await response.json();

        let errmsg = ""

        try {

            if (data.error.length > 0) {
                errmsg = data.error.join('\r\n');
            } else {
                errmsg = data;
            }
            //data.error && data.error.join('\r\n');
        } catch (error) {
            errmsg = data.error;
        }

        if (errmsg === undefined)
            errmsg = "";

        return {
            result: false,
            content: data.message + ':' + errmsg,
        };
    }
}