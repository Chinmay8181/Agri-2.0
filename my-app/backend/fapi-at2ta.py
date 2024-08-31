from flask import Flask, request, jsonify
import speech_recognition as sr
import pyttsx3
import io
import base64

app = Flask(__name__)

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    audio_data = request.files['audio']
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_data) as source:
        audio = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio)
            return jsonify({'text': text})
        except sr.UnknownValueError:
            return jsonify({'error': 'Google Speech Recognition could not understand the audio'})
        except sr.RequestError as e:
            return jsonify({'error': f'Could not request results from Google Speech Recognition service; {e}'})

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    text = request.json['text']
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)

    output = io.BytesIO()
    engine.save_to_file(text, output)
    output.seek(0)
    audio_data = output.read()
    audio_base64 = base64.b64encode(audio_data).decode('utf-8')

    return jsonify({'audio': audio_base64})

if __name__ == '__main__':
    app.run(port=5015)
