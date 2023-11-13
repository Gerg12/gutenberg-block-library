const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls } = wp.editor;
const { Button, RangeControl, PanelBody } = wp.components;
import './style.scss';

registerBlockType('custom-block-plugin/custom-hero-block', {
    title: 'Custom Hero Block',
    icon: 'shield',
    category: 'common',
    attributes: {
        heroGeneralTitle: {
            type: 'string',
            default: 'Default Title',
            source: 'html',
            selector: '.hero-general__title',
        },
        heroGeneralImage: {
            type: 'string',
            default: null,
        },
        defaultFontSize: {
            type: 'number',
            default: 16,
        },
        fontSizeAbove768: {
            type: 'number',
            default: 24,
        },
    },
    edit: (props) => {
        const {
            attributes: { heroGeneralTitle, heroGeneralImage, defaultFontSize, fontSizeAbove768 },
            setAttributes,
        } = props;

        const onTitleChange = (newTitle) => {
            setAttributes({ heroGeneralTitle: newTitle });
        };

        const onImageSelect = (media) => {
            setAttributes({ heroGeneralImage: media.url });
        };

        return (
            <section id="hero-general" className="hero-general-section">
                <InspectorControls>
                    <PanelBody title="Font Size Settings">
                        <RangeControl
                            label="Default Font Size (px)"
                            value={defaultFontSize}
                            onChange={(value) => setAttributes({ defaultFontSize: value })}
                            min={1}
                            max={100}
                        />
                        <RangeControl
                            label="Font Size Above 768px (px)"
                            value={fontSizeAbove768}
                            onChange={(value) => setAttributes({ fontSizeAbove768: value })}
                            min={1}
                            max={100}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="hero-general__image-box burns-container">
                    <MediaUpload
                        onSelect={onImageSelect}
                        type="image"
                        value={heroGeneralImage}
                        render={({ open }) => (
                            <Button onClick={open}>Select Image</Button>
                        )}
                    />
                    {heroGeneralImage && (
                        <img
                            src={heroGeneralImage}
                            alt="Hero Image"
                            style={{ maxWidth: '100%' }}
                        />
                    )}
                    <div className="hero-general-content">
												<RichText
														className="hero-general__title"
                            tagName="h2"
                            value={heroGeneralTitle}
                            onChange={onTitleChange}
                            placeholder="Enter title"
                            style={{
                                fontSize: `${fontSizeAbove768}px`,
                            }}
                        />
                    </div>
                </div>
            </section>
        );
    },
    save: (props) => {
        const { attributes: { heroGeneralTitle, heroGeneralImage, defaultFontSize, fontSizeAbove768 } } = props;

        const styles = `
            .hero-general__title {
                font-size: ${defaultFontSize}px;
            }

            @media (min-width: 768px) {
                .hero-general__title {
                    font-size: ${fontSizeAbove768}px;
                }
            }
        `;

        return (
            <section id="hero-general" className="hero-general-section">
                <style>{styles}</style>
                <div className="hero-general__image-box burns-container">
                    {heroGeneralImage && (
                        <img
                            src={heroGeneralImage}
                            alt="Hero Image"
                            style={{ maxWidth: '100%' }}
                        />
                    )}
                    <div className="hero-general-content">
                        <h2 className="hero-general__title">
                            {heroGeneralTitle}
                        </h2>
                    </div>
                </div>
            </section>
        );
    },
});
