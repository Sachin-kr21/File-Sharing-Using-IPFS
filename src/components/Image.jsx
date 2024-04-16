/* eslint-disable react/prop-types */
export default function Image(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <div className="relative group">
    <img className="w-full" src={props.url} alt="Full View" />
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-center">View Full Image</p>
    </div>
</div>

  )
}
