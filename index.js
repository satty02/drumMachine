const audioClips = [
    {
        "key": "Q",
        "keyCode" : '81',
        "id":"1",
        "song": "Heater-1",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        "key": "W",
        "keyCode" : '87',
        "id":"2",
        "song": "Heater-2",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        "key": "E",
        "keyCode" : '69',
        "id":"3",
        "song": "Heater-3",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        "key": "A",
        "keyCode" : '65',
        "id":"4",
        "song": "Heater-4",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        "key": "S",
        "keyCode" : '83',
        "id":"5",
        "song": "Heater-6",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        "key": "D",
        "keyCode" : '68',
        "id":"6",
        "song": "Dsc_Oh",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        "key": "Z",
        "keyCode" : '90',
        "id":"7",
        "song": "Kick_n_Hat",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        "key": "X",
        "keyCode" : '88',
        "id":"8",
        "song": "RP4_KICK_1",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        "key": "C",
        "keyCode" : '67',
        "id":"9",
        "song": "Cev_H2",
        "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
]


function App(){
    const [volume , setVolume] = React.useState(1);
    const [record , setRecord] = React.useState('');
    const [speed, setSpeed] = React.useState(0.5)

    const playRecording = ()=>{
        let index= 0;
        let arr_recorder = record.split(' ');

        const interval = setInterval(()=>{
            const audioTag = document.getElementById(arr_recorder[index]);
            audioTag.currentTime = 0;
            audioTag.volume = volume;
            audioTag.play();
            index++
        },speed*600);

        setTimeout(()=>clearInterval(interval), 600*speed*arr_recorder.length-1)   

    }
    return(
        <div id="drum-machine" className="bg-info min-vh-100 text-white">
            <div id="display" className="text-center">
                <h2>Drum Machine</h2>
                {audioClips.map(clip=><Pad keys={clip.id} clip={clip} volume={volume} setRecord = {setRecord}/>)}
                <br/>
                <h4>Volume</h4>
                <input 
                    type="range" 
                    step="0.01"  
                    value={volume} 
                    max="1" 
                    min="0"
                    onChange={e=> setVolume(e.target.value)} 
                    className="w-50"/>
                <h3>{record}</h3>
                {record && <>
                    <button onClick={playRecording} className="btn btn-success">Play</button>
                    <button onClick={()=>{setRecord('')}} className="btn btn-danger">Clear</button>
                    <br/>
                    <h3>Speed</h3>
                    <input 
                    type="range" 
                    step="0.01"  
                    value={speed} 
                    max="1.2" 
                    min="0.1"
                    onChange={e=> setSpeed(e.target.value)} 
                    className="w-50"/>
                </> }
            </div>
        </div>
    )
}

function Pad({clip , volume, setRecord}){


    const [active , setActive] = React.useState(false)

    React.useEffect(()=>{
        document.addEventListener('keydown' , handleKeyPress)
        return ()=>{
            document.removeEventListener('keydown' , handleKeyPress)
        }
    },[])

    const handleKeyPress = (e)=>{
        if(e.keyCode==clip.keyCode){
            
            playSound();
        }
    }

    const playSound = ()=>{
        setActive(true)
        setTimeout(()=>{setActive(false)},200)
        const audioTag = document.getElementById(clip.key);
        audioTag.currentTime = 0;
        audioTag.volume = volume
        audioTag.play();
        setRecord(prev=>prev + clip.key + ' ')
        
    }

    return (
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
            <audio className="clip" id={clip.key} src={clip.url}></audio>
            {clip.key}
        </div>
    )
}


ReactDOM.render(<App/> , document.getElementById('root'))