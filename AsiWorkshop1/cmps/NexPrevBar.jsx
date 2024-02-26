
// export function NextPrevBar({onNextClick,onPrevClick}){
export function NextPrevBar(){
    const onPrevClick = () =>{}
    const onNextClick = () =>{}
    return(
        <div className="next-prev-container">
            <div className="next-prev-button" onClick={onPrevClick}>←Previous</div>
            <div className="next-prev-button" onClick={onNextClick}>Next→</div>
        </div>
    )
}
