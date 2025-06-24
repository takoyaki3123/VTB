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

    async searchLiveStatus() {
        if (this.#youtubeHandle == '') {
            return 'no youtube handle';
        }
        if (this.#channelID == '') {
            await this.searchChannel();
        }
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.#channelID}&eventType=live&maxResults=25&type=video&key=${key}`;
        const axiosSetting = {
            withCredentials: false,
            withXSRFToken: false,
        }
        console.log('test2');
        
        baseGetApi(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.#channelID}&eventType=live&maxResults=25&type=video&key=${key}`, axiosSetting, true)
        .then((res) => {
            console.log(res);
            if (res.data.items[0]) {
                this.#liveStatus = true;
                this.#liveID = res.data.items[0].id.videoId;
                this.#liveTitle = res.data.items[0].snippet.title;
            }
        });
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
                this.#channel = res.data.items[0].snippet;
                this.#channelID = res.data.items[0].id;
            }
        });
    }
}
export default Youtube;