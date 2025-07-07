export const startCameraStream = async (
    cameraId: string,
    videoElement: HTMLVideoElement
  ) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  
    // Mostrar localmente
    videoElement.srcObject = stream;
    videoElement.play();
  
    // Crear peer connection
    const pc = new RTCPeerConnection();
  
    // Añadir pistas
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });
  
    // Crear y enviar oferta al backend
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
  
    const res = await fetch("http://localhost:8000/offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sdp: offer.sdp,
        type: offer.type,
        camera_id: cameraId,
      }),
    });
  
    const answer = await res.json();
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  };
  