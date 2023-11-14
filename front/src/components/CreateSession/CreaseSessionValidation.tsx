
const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
export function validateData(muid: string, device_type: string, transfer_usd: number): string {
        if (muid == "") {
            return "muid cannot be empty";
        }
        if (!regexExp.test(muid)) {
            return "muid must be uuid";
        }
        if (device_type == "") {
            return "device_type cannot be empty";
        }
        if (transfer_usd == 0) {
            return "transfer_usd cannot be empty";
        }
        return "";
    }