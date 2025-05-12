import axios from 'axios';

export async function streamImprovedContent(
  blogContent: string,
  onData: (text: string) => void,
  signal: AbortSignal
) {
  try {
    const response = await axios.post(
      'http://192.168.68.58:3333/api/improve-text',
      { content: blogContent },
      {
        signal,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    onData(response.data); // full improved content
  } catch (err: any) {
    if (axios.isCancel(err)) {
      console.log('Request canceled');
    } else {
      console.error('Error improving content:', err);
    }
  }
}
