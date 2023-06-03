const helper = {
    async playAudio(audioFilePath: string) {
        const audio = new Audio(audioFilePath);
        audio.id = Math.round(Math.random() * 100000000).toString();
        audio.play();
        return { duration: await getAudioDuration(audio) };
    },
    selectAnswer(answer: any) {
        answer.selected = !answer.selected;
        if (answer.audio && answer.audio !== '' && answer.selected) this.playAudio(answer.audio);
    }
};

function getAudioDuration(audio: HTMLAudioElement): Promise<number> {
    return new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        setTimeout(() => {
            resolve(0);
        }, 3000)
    });
}

export default helper;