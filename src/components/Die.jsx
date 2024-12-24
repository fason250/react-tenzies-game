
function Die(props){
    const { value,isHeld} = props.dice

    const styles = {
        backgroundColor:"#6a5acd",
        color: "#fff"
    }

    return(
        <button style={isHeld ? styles : null} className="die" onClick={()=>props.hold()}>{ value}</button>
    )
}

export default Die