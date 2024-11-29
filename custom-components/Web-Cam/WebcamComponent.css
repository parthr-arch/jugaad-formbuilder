(function () {
    const FieldComponent = Formio.Components.components.field;

    class WebcamComponent extends FieldComponent {
        static schema(...extend) {
            return FieldComponent.schema({
                type: 'webcam',
                label: 'Webcam',
                key: 'webcam',
                input: true,
                ...extend,
            });
        }

        static get builderInfo() {
            return {
                title: 'Webcam',
                group: 'basic',
                icon: 'video-camera',
                weight: 60,
                schema: WebcamComponent.schema(),
            };
        }

        get defaultSchema() {
            return WebcamComponent.schema();
        }

        render() {
            return super.render(`
            <div class="webcam-component">
                <label>${this.component.label}</label>
                <video id="webcam" autoplay></video>
                <button id="capture">Capture</button>
                <canvas id="canvas" style="display:none;"></canvas>
                <img id="photo" src="" alt="Captured Image"/>
            </div>`);
        }

        attach(element) {
            super.attach(element);
            const video = element.querySelector('#webcam');
            const canvas = element.querySelector('#canvas');
            const photo = element.querySelector('#photo');
            const captureButton = element.querySelector('#capture');

            // Access the webcam
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                })
                .catch(err => console.error("Error accessing webcam: ", err));

            // Capture image
            captureButton.addEventListener('click', () => {
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                this.dataValue = canvas.toDataURL('image/png'); // Store the captured image data in dataValue
                photo.src = this.dataValue; // Display captured image
                this.updateValue();
            });

            return element;
        }

        getValue() {
            return this.dataValue || '';
        }

        setValue(value) {
            this.dataValue = value;
            if (value) {
                const photo = this.element.querySelector('#photo');
                photo.src = value; // Update the displayed image
            }
        }

        removeComponent() {
            const video = this.element.querySelector('#webcam');
            if (video.srcObject) {
                const stream = video.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
            super.removeComponent();
        }
    }

    Formio.Components.addComponent('webcam', WebcamComponent);
})();