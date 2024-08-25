from flask import Flask, render_template, request, jsonify
from groq import Groq

app = Flask(__name__)

client = Groq(api_key="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")

@app.route('/chat1')
def index():
    return render_template('chatbot.html')

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        user_input = request.form['user_input']
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model="llama3-8b-8192",
        )
        
        response = chat_completion.choices[0].message.content
        return jsonify({'response': response})
    else:
        # For GET requests, you can return a simple response or render a template
        return render_template('chatbot.html')

    

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')