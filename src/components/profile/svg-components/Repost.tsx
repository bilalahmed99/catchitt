
export const Repost = ({ active }: { active?: boolean }) => {

    return (
        <svg fill="none" width="22" height="22" viewBox="0 0 24 24" id="repost-round" xmlns="http://www.w3.org/2000/svg" className="icon line">
            <path id="primary" d="M6,14V9A6,6,0,0,1,16.89,5.54" style={{ fill: 'none', stroke: active ? "rgb(255, 59, 92)" : "#DFDFDF", strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></path>
            <polyline id="primary-2" data-name="primary" points="8 12 6 14 4 12" style={{ fill: "none", stroke: active ? "rgb(255, 59, 92)" : "#DFDFDF", strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
            <path id="primary-3" data-name="primary" d="M18,10v5A6,6,0,0,1,7.11,18.46" style={{ fill: 'none', stroke: active ? "rgb(255, 59, 92)" : "#DFDFDF", strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></path>
            <polyline id="primary-4" data-name="primary" points="16 12 18 10 20 12" style={{ fill: "none", stroke: active ? "rgb(255, 59, 92)" : "#DFDFDF", strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
        </svg>
    )
}