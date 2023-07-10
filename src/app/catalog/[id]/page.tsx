type Props = {
    params: {
        id: string
    }
}

export default function Item({params: {id}}: Props) {
    return (
        <h1>Item page {id}</h1>
    )
}