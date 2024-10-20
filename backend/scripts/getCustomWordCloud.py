from wordcloud import WordCloud, STOPWORDS
from PIL import Image
import numpy as np
import os
import re
from string import punctuation
import random


# Folder to store generated images
IMAGE_FOLDER = 'public/images/'
if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

# Stop words and non-meaningful words removal logic
non_meaning_words = [
    " and ", " but ", " or ", " so ", " for ", " nor ", " yet ", " because ",
    " although ", " since ", " unless ", " while ", " when ", " whereas ",
    " however ", " therefore ", " furthermore ", " moreover ", " consequently ",
    " meanwhile ", " nevertheless ", " nonetheless ", " as a result ", " in addition ",
    " I ", " you ", " he ", " she ", " it ", " we ", " they ", " me ", " my ", " your "
]

html_tags = [
    '<a>', '<abbr>', '<address>', '<div>', '<form>', '<img>', '<input>', '<ul>', '</a>', '</div>', '</ul>'
]

def remove_punctuations(input_string):
    """Remove punctuation and HTML tags from the input text."""
    for tag in html_tags:
        input_string = input_string.replace(tag, " ")
    translator = str.maketrans("", "", punctuation)
    return input_string.translate(translator)

def remove_non_meaningful_words(input_string):
    """Remove non-meaningful words."""
    for word in non_meaning_words:
        input_string = input_string.replace(word, " ")
    return input_string

def get_keywords(text):
    """Extract keywords from the given text."""
    text = text.strip().lower()
    text = remove_punctuations(text)
    text = remove_non_meaningful_words(text)
    words = text.split()

    # Count occurrences of each word
    occurrences = {}
    for word in words:
        if word in occurrences:
            occurrences[word] += 1
        else:
            occurrences[word] = 1

    # Sort by frequency and return the keywords
    sorted_keywords = sorted(occurrences.items(), key=lambda x: x[1], reverse=True)
    return [keyword for keyword, count in sorted_keywords]

# Define custom color function
def american_flag_color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    colors = ['#FF0000', '#0000FF']  # Red, Blue
    return random.choice(colors)

def generate_wordcloud(text, mask_path="mapusa.png"):
    """Generate a word cloud using the given text and mask."""
    try:
        keywords = ' '.join(get_keywords(text))  # Extract keywords from text
        mask = np.array(Image.open(mask_path))  # Load the mask image

        # Generate the word cloud
        wc = WordCloud(
            background_color='white',
            mask=mask,
            contour_width=2,
            contour_color='black',
            stopwords=STOPWORDS,
            color_func=american_flag_color_func  # Apply custom color function
        ).generate(keywords)

        # Save the word cloud image
        image_path = os.path.join(IMAGE_FOLDER, 'wordcloud.png')
        wc.to_file(image_path)

        return image_path
    except Exception as e:
        raise Exception(f"Failed to generate word cloud: {str(e)}")

if __name__ == "__main__":
    # Test the functionality
    sample_text = "Democracy and freedom are the cornerstones of innovation and justice in our society."
    print(get_keywords(sample_text))  # Test keyword extraction

    # Generate a word cloud from the sample text
    generate_wordcloud(sample_text)
    print("Word cloud generated and saved!")
