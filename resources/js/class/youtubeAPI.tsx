import { baseGetApi } from "@/lib/api";

//　一日１万回検索できる
const key = import.meta.env.VITE_YOUTUBE_KEY;
class Youtube {
    
    #youtubeHandle = '';
    #channel = [];
    #channelID = '';
    #liveStatus = false;
    #liveID = '';
    #liveTitle = '';
    #liveList = [];
    #videoList = [];

    constructor(youtubeHandle: string) {
        if (youtubeHandle != null) {
            this.#youtubeHandle = youtubeHandle;
        }
    }

    getLiveStatus() {
        return this.#liveStatus;
    }
    getLiveList() {
        return this.#liveList;
    }
    getVideoList() {
        return this.#videoList;
    }
    getLiveUrl() {
        return 'https://www.youtube.com/watch?' + this.#liveID;
    }
    getLiveID() {
        return this.#liveID;
    }
    getLiveTitle() {
        return this.#liveTitle;
    }

    searchLiveStatus() {
        return new Promise(async (resolve, reject) => {
            if (this.#youtubeHandle == '') {
                console.log('no youtube handle');
                resolve(false);
            }
            if (this.#channelID.trim() == '') {
                await this.searchChannel();
            }
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.#channelID}&eventType=live&maxResults=25&type=video&key=${key}`;
            const axiosSetting = {
                withCredentials: false,
                withXSRFToken: false,
            }
            baseGetApi(url, axiosSetting, true)
            .then((res) => {
                if (res.data.items[0]) {
                    this.#liveStatus = true;
                    this.#liveID = res.data.items[0].id.videoId;
                    this.#liveTitle = res.data.items[0].snippet.title;
                    resolve(true);
                }
                resolve(false);
            })
            .catch((err) => {
                console.log(err);
                reject(false);
            });
        })
    }

    async searchChannel() {
        const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${this.#youtubeHandle}&key=${key}`;
        const axiosSetting = {
            withCredentials: false,
            withXSRFToken: false,
        }
        await baseGetApi(url, axiosSetting, true)
        .then((res) => {
            if (res.data.items) {
                if (res.data.items.length == 1) {
                    this.#channel = res.data.items[0].snippet;
                    this.#channelID = res.data.items[0].id;
                }
            }
        });
    }
}
export default Youtube;