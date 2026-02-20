// to be implemented

interface ISubscriber {
  name: string;
  update(eventData: any): void;
}

interface IPublisher {
  subscribe(observer: ISubscriber): void;
  unsubscribe(observer: ISubscriber): void;
  notify(eventData: any): void;
}

class PaperIngestionService implements IPublisher {
  private subscribers: ISubscriber[] = [];

  public subscribe(observer: ISubscriber): void {
    this.subscribers.push(observer);
    console.log(
      `[System] ${observer.name} has subscribed to Paper Ingestion events.`,
    );
  }

  public unsubscribe(observer: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`[System] ${observer.name} has unsubscribed.`);
  }

  public notify(eventData: any): void {
    console.log(`\n[Publisher] Broadcasting event: ${eventData.title}`);
    for (const sub of this.subscribers) {
      sub.update(eventData);
    }
  }

  public ingestNewPaper(paperId: string, title: string): void {
    this.notify({
      id: paperId,
      title,
      timestamps: new Date(),
    });
  }
}

class SearchIndexUpdater implements ISubscriber {
  public name = "SearchIndexUpdater";
  public update(eventData: any): void {
    console.log(
      `[${this.name}] Adding "${eventData.title}" to Elasticsearch...`,
    );
  }
}

class AuthorTrackerEmailer implements ISubscriber {
  public name = "AuthorTrackerEmailer";

  public update(eventData: any): void {
    console.log(
      `[${this.name}] Sending email alerts to users tracking this topic...`,
    );
  }
}

const ingestionService = new PaperIngestionService();

const searchUpdater = new SearchIndexUpdater();
const emailer = new AuthorTrackerEmailer();

ingestionService.subscribe(searchUpdater);
ingestionService.subscribe(emailer);

ingestionService.ingestNewPaper("DOC-1", "LLD In Nodejs");

ingestionService.unsubscribe(emailer);

ingestionService.ingestNewPaper("DOC-2", "DSA in nodejs apps");
