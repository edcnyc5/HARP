import { readable, writable } from "svelte/store";

export let isplaying = writable(null);
export let audiosource = writable([]);
export let prevsource = writable([]);
export let menuitem = writable([]);
export let autoplaystate = writable(null);
export let ishome = writable(null);
export let issettings = writable(null);
export let showplayer = writable(null);
export let showMenu = writable(null);
export let currenttime = writable({});
export let currentduration = writable({});
export let lastvol = writable();
export let spacesList = writable({});
export let repoSongListRaw = writable([]);
export let audioList = writable([]);
export let songList = writable([]);
export let bibleList = writable([]);

// export const getSpacesPayload = writable(async function() {
//     let {data, error, status} = await run

//     if(error && status !== 406)
//             alert(JSON.stringify(error))
  
//         if(data)
//         {
//             console.log('data: ', data);
//         }
// });
