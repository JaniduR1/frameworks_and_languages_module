const ListView = ({ items, onDelete }) => {
    return ( 
        <div className='px-2'>
            <div>
                <h2 className='text-4xl font-bold'>Items</h2>
            </div>
            <ul>
                {items.map(item => (
                <li className='py-3' key={item.id}>
                    <div className='max-w-xs rounded overflow-hidden shadow-lg p-2'>
                        <img className='w-20' src={item.image} alt={item.image} />
                        <div className='px-6 py-4'>

                            <div className='font-bold text-xl mb-2'>
                                {/* <span data-field="id">ID: {item.id}</span> */}
                                <span className='underline'>ID</span>:<span data-field="id">{item.id}</span>
                            </div>

                            <p className='text-gray-700 text-base p-1'>
                                {/* <span data-field="user_id">User ID: {item.user_id}</span> */}
                                <span className='underline'>User ID</span>:<span data-field="user_id">{item.user_id}</span>
                            </p>

                            <p className='text-gray-700 text-base p-1'>
                                {/* <span data-field="keywords">Keywords: {item.keywords}</span> */}
                                <span className='underline'>Keywords</span>:<span data-field="keywords">{item.keywords}</span>
                            </p>

                            <p className='text-gray-700 text-base p-1'>
                                {/* <span data-field="description">Description: {item.description}</span> */}
                                <span className='underline'>Description</span>:<span data-field="description">{item.description}</span>
                            </p>

                            <p className='text-gray-700 text-base p-1'>
                                {/* <span data-field="lat">Latitude: {item.lat}</span> */}
                                <span className='underline'>Latitude</span>:<span data-field="lat">{item.lat}</span>
                            </p>

                            <p className='text-gray-700 text-base p-1'>
                                {/* <span data-field="lon">Longitude: {item.lon}</span> */}
                                <span className='underline'>Longitude</span>:<span data-field="lon">{item.lon}</span>
                            </p>

                        </div>
                        <div className='px-6 pt-4 pb-2 text-center'>
                            <button className='bg-transparent font-semibold py-2 px-4 border border-black rounded hover:bg-rose-700 hover:text-white' data-action="delete" onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                </li>
                )
                )}
            </ul>
        </div>
     );
};
 
export default ListView;