export const Roboto = () => (
    <>
        <link rel='preload' href='/fonts/Roboto-Bold.ttf' as='font' crossOrigin='anonymous' />
        <link rel='preload' href='/fonts/Roboto-BoldItalic.ttf' as='font' crossOrigin='anonymous' />
        <link rel='preload' href='/fonts/Roboto-Regular.ttf' as='font' crossOrigin='anonymous' />
        <link rel='preload' href='/fonts/Roboto-Thin.ttf' as='font' crossOrigin='anonymous' />
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{
            __html:
                `@font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 700;
                    font-display: swap;
                    src: local('Roboto-Bold'),
                        url('/fonts/Roboto-Bold.ttf') format('ttf')
                }

                @font-face {
                    font-family: 'Roboto';
                    font-style: italic;
                    font-weight: 700;
                    font-display: swap;
                    src: local('Roboto-BoldItalic'),
                        url('/fonts/Roboto-BoldItalic.ttf') format('ttf')
                }
                @font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-display: swap;
                    src: local('Roboto-Regular'),
                        url('/fonts/Roboto-Regular.ttf') format('ttf')
                }

                @font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 100;
                    font-display: swap;
                    src: local('Roboto-Thin'),
                        url('/fonts/Roboto-Thin.ttf') format('ttf')
                }`,
            }}
        />
    </>
);