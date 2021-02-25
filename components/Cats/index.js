import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Cats = () => {

    const { data, error } = useSwr('/api/cats', fetcher);

    if (error || data?.error) return <div>Failed to load cats facts</div>
    if (!data) return <div>Loading...</div>

    const catsJSX = (data && !data.error) && data.map(({ _id, text }) => (
        <p key={_id}>
            {text}
        </p>
    ));

    return (
        <div>
            { catsJSX }
        </div>
    );
};

export default Cats;