
export default function Mask(props: any) {
    return (
        <div className="mask" style={{display:props.visible?'block':'none'}} onClick={props.onMaskClick}>
            {props.children}
        </div>
    )

}