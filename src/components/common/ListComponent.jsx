const ListComponent = ({ data, renderItem }) => {
    return data.map(item=>renderItem(item))
}

export default ListComponent