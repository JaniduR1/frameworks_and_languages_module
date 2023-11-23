const ListView = ({ items, onDelete }) => {
    return ( 
        <div>
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                <li key={item.id}>
                    <img src={item.image} alt={item.description} />
                    <div className="card-body">
                    <span data-field="id">ID: {item.id}</span>
                    <span data-field="user_id">User ID: {item.user_id}</span>
                    <span data-field="keywords">Keywords: {item.keywords}</span>
                    <span data-field="description">Description: {item.description}</span>
                    <span data-field="lat">Latitude: {item.lat}</span>
                    <span data-field="lon">Longitude: {item.lon}</span>
                    <button data-action="delete" onClick={() => onDelete(item.id)}>Delete</button>
                    </div>
                </li>
                )
                )}
            </ul>
        </div>
     );
};
 
export default ListView;