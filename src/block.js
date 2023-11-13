const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls, BlockControls } = wp.editor;
const { Button, RangeControl, PanelBody, RadioControl, Toolbar } = wp.components;
import './style.scss';

// Custom Hero Block
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
    // Destructuring props to extract needed properties
    const {
      attributes: { heroGeneralTitle, heroGeneralImage, defaultFontSize, fontSizeAbove768 },
      setAttributes,
    } = props;

    // Handler for title change
    const onTitleChange = (newTitle) => {
      setAttributes({ heroGeneralTitle: newTitle });
    };

    // Handler for image selection
    const onImageSelect = (media) => {
      setAttributes({ heroGeneralImage: media.url });
    };

    return (
      <section className="hero-general-section">
        <BlockControls>
          {/* Toolbar for moving the block */}
          <Toolbar>
            <MediaUpload
              onSelect={onImageSelect}
              type="image"
              value={heroGeneralImage}
              render={({ open }) => (
                <Button onClick={open} icon="format-image">Select Image</Button>
              )}
            />
          </Toolbar>
        </BlockControls>

        <InspectorControls>
          {/* Font Size Settings Panel */}
          <PanelBody title="Font Size Settings">
            {/* Default Font Size Control */}
            <RangeControl
              label="Default Font Size (px)"
              value={defaultFontSize}
              onChange={(value) => setAttributes({ defaultFontSize: value })}
              min={1}
              max={100}
            />
            {/* Font Size Above 768px Control */}
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
          {/* Media Upload Button */}
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
            {/* RichText Editor for Title */}
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

    // Styles for controlling font size
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
      <section className="hero-general-section">
        {/* Styles for controlling font size */}
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
            {/* Displaying the saved title */}
            <h2 className="hero-general__title">
              {heroGeneralTitle}
            </h2>
          </div>
        </div>
      </section>
    );
  },
});

// Flex Cards Block
registerBlockType('custom-block-plugin/flex-cards-block', {
  title: 'Flex Cards Block',
  icon: 'grid-view',
  category: 'common',
  attributes: {
    flexCards: {
      type: 'array',
      default: [],
    },
    blocksPerRow: {
      type: 'string',
      default: '2',
    },
  },
  edit: (props) => {
    const { attributes: { flexCards, blocksPerRow }, setAttributes } = props;

    // Handler for title change in each card
    const onTitleChange = (newTitle, index) => {
      const updatedCards = [...flexCards];
      updatedCards[index] = { ...updatedCards[index], title: newTitle };
      setAttributes({ flexCards: updatedCards });
    };

    // Handler for text change in each card
    const onTextChange = (newText, index) => {
      const updatedCards = [...flexCards];
      updatedCards[index] = { ...updatedCards[index], text: newText };
      setAttributes({ flexCards: updatedCards });
    };

    // Handler for image selection in each card
    const onImageSelect = (media, index) => {
      const updatedCards = [...flexCards];
      updatedCards[index] = { ...updatedCards[index], image: media.url };
      setAttributes({ flexCards: updatedCards });
    };

    // Function to add a new card
    const addCard = () => {
      setAttributes({
        flexCards: [...flexCards, { title: '', image: null, text: '', link: '' }],
      });
    };

    // Function to remove a card
    const removeCard = (index) => {
      const updatedCards = [...flexCards];
      updatedCards.splice(index, 1);
      setAttributes({ flexCards: updatedCards });
    };

    // Handler for link change in each card
    const onLinkChange = (newLink, index) => {
      const updatedCards = [...flexCards];
      updatedCards[index] = { ...updatedCards[index], link: newLink };
      setAttributes({ flexCards: updatedCards });
    };

    // Handler for blocks per row change
    const onBlocksPerRowChange = (value) => {
      setAttributes({ blocksPerRow: value });
    };

    return (
      <>
        <InspectorControls>
          {/* Flex Cards Panel */}
          <PanelBody title="Flex Cards">
            {/* Button to add a new card */}
            <Button className="flex-cards__add-button" onClick={addCard}>Add Card</Button>
          </PanelBody>
          {/* Radio control for selecting blocks per row */}
          <PanelBody title="Blocks Per Row">
            <RadioControl
              label="Blocks Per Row"
              selected={blocksPerRow}
              options={[
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
              onChange={onBlocksPerRowChange}
            />
          </PanelBody>
        </InspectorControls>

        {/* Display add card button outside InspectorControls for accessibility */}
        <div>
          <Button className="flex-cards__add-button" onClick={addCard}>Add Card</Button>
        </div>

        {/* Displaying the list of flex cards */}
        <div className={`flex-cards__wrapper flex-cards__${blocksPerRow} admin-edit`}>
          {flexCards.map((card, index) => (
            <div key={index} className="flex-cards__item">
              {/* Media Upload Button for Image */}
              <MediaUpload
                onSelect={(media) => onImageSelect(media, index)}
                type="image"
                value={card.image}
                render={({ open }) => (
                  <Button onClick={open}>{card.image ? 'Change Image' : 'Select Image'}</Button>
                )}
              />
              {card.image && (
                <div class="flex-cards__image-box">
									<img
										src={card.image}
										alt={`Flex Card ${index + 1} Image`}
										style={{ maxWidth: '100%' }}
									/>
								</div>
              )}
              <div className="flex-cards-content">
                {/* RichText Editor for Title */}
                <RichText
                  className="flex-cards__title"
                  tagName="h2"
                  value={card.title}
                  onChange={(newTitle) => onTitleChange(newTitle, index)}
                  placeholder="Enter title"
                />
                {/* RichText Editor for Text */}
                <RichText
                  className="flex-cards__text"
                  tagName="p"
                  value={card.text}
                  onChange={(newText) => onTextChange(newText, index)}
                  placeholder="Enter text"
                />
                {/* RichText Editor for Link */}
                <RichText
                  className="flex-cards__link"
                  tagName="a"
                  value={card.link}
                  onChange={(newLink) => onLinkChange(newLink, index)}
                  placeholder="Enter link"
                />
                {/* Button to remove the card */}
                <div>
									<Button className="flex-cards__remove-button" onClick={() => removeCard(index)}>Remove Card</Button>
								</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  },
  save: (props) => {
    const { attributes: { flexCards, blocksPerRow } } = props;

    // Function to render each flex card item
    const renderFlexCardItems = (card, index) => (
      <div className="flex-cards__inner">
        {card.image && (
          <div class="flex-cards__image-box">
						<img
							src={card.image}
							alt={`Flex Card ${index + 1} Image`}
							style={{ maxWidth: '100%' }}
						/>
					</div>
        )}
        <div className="flex-cards-content">
          {/* Title of the flex card */}
          <h2 className="flex-cards__title">
            {card.title}
          </h2>
          {/* Text of the flex card */}
          <p className="flex-cards__text">
            {card.text}
          </p>
        </div>
      </div>
    );

    return (
      <section className={`flex-cards-section flex-cards__${blocksPerRow} gutter`}>
        {/* Wrapper for flex cards */}
        <div className="flex-cards__wrapper container">
          {flexCards.map((card, index) => (
            <div className="flex-cards__item" key={index}>
              {/* Check if the card has a link */}
              {card.link ? (
                // Render flex card items with a link
                <a href={card.link} className="flex-cards__link-wrapper">
                  {renderFlexCardItems(card, index)}
                </a>
              ) : (
                // Render flex card items without a link
                renderFlexCardItems(card, index)
              )}
            </div>
          ))}
        </div>
      </section>
    );
  },
});