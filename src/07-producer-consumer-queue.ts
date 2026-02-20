// Producer Consumer Pattern

// ticket structure for the queue
interface IMessage {
  jobId: string;
  taskType: "PARSE_PDF" | "COMPRESS_VIDEO";
  payload: any;
}

// queue to hold our jobs
class MessageQueue {
  private queue: IMessage[] = [];
  public enqueue(message: IMessage): void {
    this.queue.push(message);
    console.log(
      `Job ${message.jobId} added. Queue length: ${this.queue.length}`,
    );
  }

  public dequeue(): IMessage | undefined {
    return this.queue.shift(); // older ones first
  }

  public hasJobs(): boolean {
    return this.queue.length > 0;
  }
}

// api for user
class ApiProducer {
  private queue: MessageQueue;
  constructor(queue: MessageQueue) {
    this.queue = queue;
  }

  public handleUpload(
    fileName: string,
    type: "PARSE_PDF" | "COMPRESS_VIDEO",
  ): void {
    const newJob: IMessage = {
      jobId: Math.random().toString(36).substring(7),
      taskType: type,
      payload: { file: fileName, uploadedAt: Date.now() },
    };

    console.log(
      `\n Received file: ${fileName}. Handing off to background workers...`,
    );
    this.queue.enqueue(newJob);
  }
}

// workers - Please note this is not how nodejs workers work. They spin a new isolated V8 engine in the background

class BackgroundWorker {
  private queue: MessageQueue;
  private workerName: string;
  private isWorking: boolean = false;

  constructor(name: string, queue: MessageQueue) {
    this.workerName = name;
    this.queue = queue;
  }

  // for checking the queue
  public async startPolling(): Promise<void> {
    setInterval(async () => {
      if (!this.isWorking && this.queue.hasJobs()) {
        await this.processNextJob();
      }
    }, 1000);
  }

  private async processNextJob(): Promise<void> {
    const job = this.queue.dequeue();
    if (!job) return;
    this.isWorking = true;
    console.log(`\n Started processing ${job.jobId} (${job.taskType})...`);

    await this.heavyComputation(job.taskType);
    console.log(`[${this.workerName}] Finished processing ${job.jobId}.`);
  }

  private heavyComputation(type: string) {
    const processingTime = type === "COMPRESS_VIDEO" ? 4000 : 2000;
    return new Promise((resolve) => setTimeout(resolve, processingTime));
  }
}

// central queue
const sharedQueue = new MessageQueue();

const workerA = new BackgroundWorker("Worker_A", sharedQueue);
workerA.startPolling();

const webApi = new ApiProducer(sharedQueue);

setTimeout(() => {
  webApi.handleUpload("ml.pdf", "PARSE_PDF");
  webApi.handleUpload("tech.mp4", "COMPRESS_VIDEO");
  webApi.handleUpload("economics.pdf", "PARSE_PDF");
}, 1500);
